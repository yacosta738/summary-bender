<script setup lang="ts">
import { Container, Button, Head, Heading, Hr, Text, Row, Section} from '@vue-email/components'
const props = withDefaults(defineProps<{
  title: string,
  emails: string[],
}>(), {
  title: 'Your Daily Summary Email',
})
</script>

<template>
  <Container>
    <Head>
      <title>{{props.title}}</title>
      <meta name="description" content="Your daily summary email" >
    </Head>
    <Heading as="h2">{{props.title}}</Heading>

    <Section>
      <Row v-for="email in props.emails" :key="email">
        <Text>
          {{email}}
        </Text>
      </Row>
    </Section>


    <Hr />
    <Button href="https://yunielacosta.com" style="color: #61dafb; padding: 10px 20px;">
      Click me
    </Button>
  </Container>
</template>
