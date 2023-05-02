<script setup lang="ts">
import { FormKitNode } from '@formkit/core'
import { IFormData } from '~/types/index'

const successMessage = ref<string | null>(null)

async function sendEmail(data: IFormData, node: FormKitNode | undefined): Promise<void> {
  successMessage.value = null
  try {
    const { data: emailRes, error } = await useFetch('/api/user/send-email', {
      method: 'POST',
      body: data
    })
    if (!emailRes.value) {
      node?.setErrors([error.value?.statusMessage!])
    }
    if (emailRes.value === 200) {
      successMessage.value = 'Email has been sent.'
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div class="h-screen flex justify-center items-center bg-slate-100">
    <div class="max-w-lg w-full bg-white rounded shadow-md p-6">
      <div class="mb-10">
        <h1 class="text-slate-700 text-2xl text-center uppercase font-bold">Send Email</h1>
      </div>
      <div class="text-green-500">{{ successMessage }}</div>
      <FormKit
        type="form"
        submit-label="Send Email"
        @submit="sendEmail"
      >
        <FormKit
          type="text"
          name="name"
          label="Name"
        />
        <FormKit
          type="email"
          name="email"
          label="Email address"
        />
        <FormKit
          type="text"
          label="Subject"
          name="subject"
          help="Subject of your email."
        />
        <FormKit
          type="textarea"
          label="Subject"
          name="body"
          rows="10"
          help="Add your email content"
        />
      </FormKit>
    </div>
  </div>
</template>
<style lang="css">
.formkit-wrapper {
  max-width: 100% !important;
  width: 100%;
}

.formkit-label {
  font-weight: 400 !important;
  opacity: 0.8;
}
</style>