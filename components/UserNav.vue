<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const client = useSupabaseClient()
const user = useSupabaseUser()

const {data} = await client
.from('profiles')
.select(`username, website, avatar_url`)
.eq('id', user.value.id)
.single()
const avatarUrl = ref(data?.avatar_url ?? user.value.user_metadata.avatar_url)
const logout = async () => {
  await client.auth.signOut()
  navigateTo('/')
}
watchEffect(() => {
  if (!user.value) {
    navigateTo('/login')
  }
})

</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <ProfileAvatar
v-model:path="avatarUrl"
          class="h-8 w-8"
                       :alt="`Avatar for ${user.user_metadata.full_name}`"
        />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ user.user_metadata.user_name }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{ user.user_metadata.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator/>
      <DropdownMenuGroup>
        <NuxtLink to="/dashboard/profile">
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </NuxtLink>
        <NuxtLink to="/dashboard/settings">
        <DropdownMenuItem>
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        </NuxtLink>
      </DropdownMenuGroup>
      <DropdownMenuSeparator/>
      <DropdownMenuItem @click="logout">
        Log out
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
