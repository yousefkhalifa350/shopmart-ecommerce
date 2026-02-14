'use client'
import React, { useState } from 'react'
  import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {signIn} from 'next-auth/react' 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card } from '@/components/ui/card'
import { useRouter, useSearchParams } from 'next/navigation'
import { Loader, Loader2, Router } from 'lucide-react'
import { HeroGeometric } from '@/components/ui/shadcn-io/shape-landing-hero'
import Loading from '@/app/loading'
import toast from 'react-hot-toast';


//shakl l data 3ndkk
const formSchema = z.object({

email: z
  .string()
  .nonempty('Email is required')
  .email('Invalid Email!'),

password: z
  .string()
  .nonempty('Password is required')
  .min(6, 'Min length is 6 char!')

})



//type of te data and value of Zod 
type FormFields = z.infer<typeof formSchema>

export default function Login() {

  const router = useRouter();

const [isloading, setIsloading] = useState(false)
const SearchParams = useSearchParams()
console.log(SearchParams.get('error'));


// 1. Define your form.
const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
    email:'', 
    password:'',
    },
  })
 


  //Take the data from our end and send to next-auth
  async function onSubmit(values:FormFields) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

setIsloading(true)

const response = await signIn("credentials", {

email:values.email,
password:values.password,
callbackUrl:'/',
redirect:true

})

    console.log(response)
    setIsloading(false)
    toast.success('Logged in successfully')
  }




  return (
<>





<section className="relative min-h-screen w-full overflow-hidden ">


   
 {/* ===== Background Image ===== */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
            alt="shopping background"
            className="block w-full h-full object-cover"
          />
          {/* Brand overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>


        <div className='relative z-10 min-h-screen flex items-center'>


          <div className='w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>


    {/* ===== Left (Brand / Text) ===== */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.7,delay: 0.3,ease: "easeOut"}}
              className="text-white"
            >
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
                Shop smarter.
                <br />
                <span className="text-orange-400">Live better.</span>
              </h1>

              <p className="hidden sm:block mt-6 max-w-md text-white/80 text-lg ">
                Discover the latest trends, exclusive deals, and everything you
                need — all in one place.
              </p>
            </motion.div>



            {/* ===== Right (Login Card) ===== */}
       <motion.div
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.7,delay: 0.3,ease: "easeOut"}}
  className="flex justify-center lg:justify-end"
>
  <div
    className="
      w-full max-w-md
      bg-white
      rounded-3xl
      shadow-2xl
      p-8
      -mt-16 sm:mt-0
      relative z-20
    "
  >
    {/* Header */}
    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
      Welcome Back
    </h2>
    <p className="text-gray-500 mb-6">
      Please login to your account
    </p>

    <Form {...form}>
      {SearchParams.get("error") && (
        <p className="text-red-500 text-sm mb-4 text-center">
          {SearchParams.get("error")}
        </p>
      )}

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Yousef@example.com"
                  className="
                    h-14
                    rounded-full
                    px-6
                    bg-gray-50
                    border border-gray-200
                    focus:bg-white
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-200
                  "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">
                Your Password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="
                    h-14
                    rounded-full
                    px-6
                    bg-gray-50
                    border border-gray-200
                    focus:bg-white
                    focus:border-orange-500
                    focus:ring-2
                    focus:ring-orange-200
                  "
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Button */}
        <button
          type="submit"
          className="
            w-full h-12 rounded-full bg-orange-400 hover:bg-orange-500 transition text-white font-semibold tracking-wide cursor-pointer
          "
        >
          {isloading ? <span className="vip-spinner" /> : "Login"}
        </button>


<p className="mt-6 text-center text-sm text-gray-500">
  Don't have an account?{" "}
  <span
    className="text-orange-500 font-semibold cursor-pointer
               hover:text-orange-600 transition-colors hover:underline"
    onClick={() => router.push("/register")}
  >
    Sign up
  </span>
</p>



      </form>
    </Form>
  </div>
</motion.div>


            </div>

            </div>





    </section>



</>
  )
}
