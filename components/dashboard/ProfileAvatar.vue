<script setup lang="ts">
import type {Ref} from "vue";
import type {User} from "@supabase/auth-js/src/lib/types";
import {FormControl, FormField, FormItem, FormMessage} from "~/components/ui/form";
import {Input} from "~/components/ui/input";

const props = withDefaults(defineProps<{
  path: string,
  alt: string,
  size?: 'sm' | 'base' | 'lg',
  updatable?: boolean
}>(), {
  size: 'sm',
  updatable: false
})

const { path, alt } = toRefs(props)

const emit = defineEmits<{
  (evt: 'update:path', value: string): void,
  (evt: 'upload'): void,
}>();
const supabase = useSupabaseClient()
const user: Ref<User> = useSupabaseUser()
const uploading = ref(false)

const src = ref('')
const files = ref()
const { $getInitials } = useNuxtApp()

const userInitials = computed(() => $getInitials(user.value.user_metadata.full_name))
const isExternalProvider = (path: string, providers: string[]): boolean => {
  return providers.some(provider => path.includes(provider));
}

const downloadImage = async () => {
  if (!path.value) return;
  const externalProviders = ["githubusercontent.com", "google.com"];
  if (isExternalProvider(path.value, externalProviders)) {
    src.value = path.value;
    console.log('External provider image:', path.value);
    return;
  }
  const isDirectUrl = /^(http|https):\/\//.test(path.value);
  if (isDirectUrl) {
    src.value = path.value;
    console.log('Direct URL image:', path.value);
    return;
  }
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value)
    if (error) throw error
    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.error('Error downloading image: ', error.message)
  }
}
const uploadAvatar = async (evt) => {
  files.value = evt.target.files
  try {
    uploading.value = true

    if (!files.value || files.value.length === 0) {
      throw new Error('You must select an image to upload.')
    }

    const file = files.value[0]
    const fileExt = file?.name?.split('.')?.pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

    if (uploadError) throw uploadError

    emit('update:path', filePath)
    emit('upload')
  } catch (error) {
    alert(error.message)
  } finally {
    uploading.value = false
  }
}

downloadImage()

watch(path, () => {
  if (path.value) {
    downloadImage()
  }
})
</script>

<template>
  <FormField v-slot="{ componentField }" name="avatar">
    <FormItem>
      <Avatar :size="size">
        <AvatarImage
v-if="src"
                     :src="src" :alt="alt" />
        <AvatarFallback>{{ userInitials }}</AvatarFallback>
      </Avatar>
      <FormControl v-if="updatable">
        <Input
type="file"
               accept="image/*"
               :disabled="uploading"
               placeholder="Select your profile image"
               @change="uploadAvatar"/>
        <Input type="text" :placeholder="user.user_metadata.user_name" v-bind="componentField" class="hidden" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped>

</style>
