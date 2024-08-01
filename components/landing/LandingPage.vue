<script setup lang="ts">
import LandingPageFooter from "~/components/landing/LandingPageFooter.vue";
import LandingCTA from "~/components/landing/LandingCTA.vue";

function onError(event: Event) {
  const target = event.target as HTMLImageElement;
  target.src = '/placeholder.svg';
}
</script>

<template>
  <div class="flex flex-col min-h-[100dvh]">
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div class="container px-4 md:px-6">
          <div class="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Effortlessly Summarize Your Emails
                </h1>
                <p class="max-w-[600px] text-muted-foreground md:text-xl">
                  Our email summarization tool helps you quickly digest the most important information in your inbox,
                  saving you time and increasing your productivity.
                </p>
              </div>
              <div>
                <NuxtLink
                  to="/dashboard"
                  class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Try It Now
                </NuxtLink>
              </div>
            </div>
            <NuxtImg
              src="/email-landing.avif"
              width="550"
              height="310"
              alt="Hero"
              class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              @error="onError"
            />
          </div>
        </div>
      </section>
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div class="grid items-center gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
            <NuxtImg
              src="/streamline-your-email-workflow.avif"
              width="550"
              height="310"
              alt="Image"
              class="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              @error="onError"
            />
            <div class="flex flex-col justify-center space-y-4">
              <div class="space-y-2">
                <div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Key Features</div>
                <h2 class="text-3xl font-bold tracking-tighter sm:text-5xl">Streamline Your Email Workflow</h2>
                <p class="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our email summarization tool helps you quickly identify the most important information, so you can
                  focus on what matters most.
                </p>
              </div>
              <ul class="grid gap-2 py-4">
                <li>
                  <Icon name="material-symbols-light:mark-email-read-rounded" color="black" class="mr-2 inline-block h-4 w-4" />
                  Automatically summarize email content
                </li>
                <li>
                  <Icon name="streamline:artificial-intelligence-spark" color="black" class="mr-2 inline-block h-4 w-4" />
                  Prioritize important emails with AI-powered analysis
                </li>
                <li>
                  <Icon name="hugeicons:artificial-intelligence-07" color="black" class="mr-2 inline-block h-4 w-4" />
                  Streamline your workflow and save time
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <LandingCTA />
    </main>
    <LandingPageFooter />
  </div>
</template>
