  'use client'
  import { motion } from "framer-motion";
  import { z } from "zod"

  import { useEffect, useState } from "react";
  import { useForm } from "react-hook-form";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { signup } from "@/app/functions/signup";
  import toast from "react-hot-toast";
  import { useRouter } from "next/navigation"

  //shakl l data 3ndkk
  const formSchema = z.object({

  name:z.string('Invalid Fullname!').nonempty('Fullname is required').min(8,'Min Two Name'),
  email:z.string().nonempty('Email is required').regex(/.+@.+\..+/, 'Please enter invalid email'),
  password:z.string('Password is not valid!').nonempty('Password is required').regex(/^(?=.*[A-Z])(?=.*\d).{6,}$/,'Matches 8 or more characters that are alphanumeric or from the specified special character at least one special character.'),
  rePassword : z.string().nonempty('rePassword is required'),
  phone:z.string().nonempty('Phone is required') .regex(/^\d{11}$/, 'must be 11 digits')

  }).refine((data)=>data.password  === data.rePassword,{path:['rePassword'],message:'Passwords must be the same'})




  //type of te data and value of Zod 
type FormFields = z.infer<typeof formSchema>

  export default function Register() {

    const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resperror, setResperror] = useState<string | null>(null);

  const { handleSubmit, register, watch, formState: { errors, touchedFields } } =
    useForm<FormFields>({
      defaultValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: '',
      },
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      reValidateMode: 'onBlur',
    });

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  // mounted guard
  useEffect(() => {
    setMounted(true);
  }, []);

  // watch subscription
  useEffect(() => {
    const subscription = watch((value) => {
      setValues({
        name: value.name || "",
        email: value.email || "",
        password: value.password || "",
        rePassword: value.rePassword || "",
        phone: value.phone || "",
      });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  // ❗ الشرط بعد كل الـ hooks
  if (!mounted) return null;

  async function sendAccountRegitser (userdata:any){
  setLoading(true)
  const response = await signup(userdata)

  if(response.message=='success'){
    toast.success('Your Account is Created!')
    router.push('/login')
  }else{
    toast.error(response.message)
  }

  setLoading(false)


  console.log(response);



  }



    return (





      <section className="relative h-screen w-full overflow-hidden bg-amber-700">

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

        {/* ===== Content ===== */}
        <div className="relative z-10 min-h-screen flex items-center">
        
          <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

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
              <div className="  w-full max-w-md
      bg-white rounded-3xl shadow-2xl
      p-6 sm:p-8
    -mt-16 sm:mt-0
      pt-0 sm:pt-8
      sm:max-w-md
      relative z-200">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 pt-2">
                  Welcome Back
                </h2>
                <p className="text-gray-500 mb-2">
                  Sign in to continue shopping
                </p>











                <form className="space-y-3" onSubmit={handleSubmit(sendAccountRegitser)}>
            
                  
    {/* NAME */}

  <div className="relative w-full">

    <input
      id="name"
      type="text"
      autoComplete="off"
      {...register("name")}
      className={`
        peer w-full px-5 py-4 rounded-full border
        ${errors.name && touchedFields.name
          ? "border-red-500"
          : "border-gray-300"}
      `}
    />

    <label
      htmlFor="name"
      className={`
        absolute left-5 bg-white px-1 transition-all duration-300
        ${values.name
          ? "top-0 text-sm text-orange-400"
          : "top-[35%] translate-y-[-55%] text-gray-400"}
        peer-focus:top-0
        peer-focus:text-sm
        peer-focus:text-orange-500
      `}
    >
      Full name
    </label>

    {errors.name && touchedFields.name && (
      <p className="mt-1 text-sm text-red-500">
        {errors.name.message}
      </p>
    )}
  </div>

    {/* EMAIL */}

  <div className="relative w-full">

    <input
      id="email"
      type="text"
      autoComplete="off"
      {...register("email")}
      className={`
        peer w-full px-5 py-4 rounded-full border
        ${errors.email && touchedFields.email
          ? "border-red-500"
          : "border-gray-300"}
      `}
  />

    <label
      htmlFor="name"
      className={`
        absolute left-5 bg-white px-1 transition-all duration-300
        ${values.email
          ? "top-0 text-sm text-orange-400"
          : "top-[35%] translate-y-[-55%] text-gray-400"}
        peer-focus:top-0
        peer-focus:text-sm
        peer-focus:text-orange-500
      `}
    >
    Email Address
    </label>

    {errors.email && touchedFields.email && (
      <p className="mt-1 text-sm text-red-500">
        {errors.email.message}
      </p>
    )}
  </div>

    {/* PASSWORD */}

  <div className="relative w-full">

    <input
      id="password"
      type="password"
      autoComplete="off"
      {...register("password")}
      className={`
        peer w-full px-5 py-4 rounded-full border
        ${errors.password && touchedFields.password
          ? "border-red-500"
          : "border-gray-300"}
      `}
  />

    <label
      htmlFor="name"
      className={`
        absolute left-5 bg-white px-1 transition-all duration-300
        ${values.password
          ? "top-0 text-sm text-orange-400"
          : "top-[35%] translate-y-[-55%] text-gray-400"}
        peer-focus:top-0
        peer-focus:text-sm
        peer-focus:text-orange-500
      `}
    >
      Your Password
    </label>

    {errors.password && touchedFields.password && (
      <p className="mt-1 text-sm text-red-500">
        {errors.password.message}
      </p>
    )}
  </div>

    {/* CONFIRM PASSWORD */}


  <div className="relative w-full">

    <input
      id="rePassword"
      type="password"
      autoComplete="off"
      {...register("rePassword")}
      className={`
        peer w-full px-5 py-4 rounded-full border
        ${errors.rePassword && touchedFields.rePassword
          ? "border-red-500"
          : "border-gray-300"}
      `}
    />

    <label
      htmlFor="name"
      className={`
        absolute left-5 bg-white px-1 transition-all duration-300
        ${values.rePassword
          ? "top-0 text-sm text-orange-400"
          : "top-[35%] translate-y-[-55%] text-gray-400"}
        peer-focus:top-0
        peer-focus:text-sm
        peer-focus:text-orange-500
      `}
    >
      rePassword
    </label>

    {errors.rePassword && touchedFields.rePassword && (
      <p className="mt-1 text-sm text-red-500">
        {errors.rePassword.message}
      </p>
    )}
  </div>
    {/* PHONE */}

  <div className="relative w-full">

    <input
      id="phone"
      type="tel"
      autoComplete="off"
      {...register("phone")}
      className={`
        peer w-full px-5 py-4 rounded-full border
        ${errors.phone && touchedFields.phone
          ? "border-red-500"
          : "border-gray-300"}
      `}
  />

    <label
      htmlFor="name"
      className={`
        absolute left-5 bg-white px-1 transition-all duration-300
        ${values.phone
          ? "top-0 text-sm text-orange-400"
          : "top-[35%] translate-y-[-55%] text-gray-400"}
        peer-focus:top-0
        peer-focus:text-sm
        peer-focus:text-orange-500
      `}
    >
    Your Phone
    </label>

    {errors.phone && touchedFields.phone && (
      <p className="mt-1 text-sm text-red-500">
        {errors.phone.message}
      </p>
    )}
  </div>












                  <button         type="submit"
                    className="w-full bg-orange-400 cursor-pointer hover:bg-orange-500 transition text-white py-3 rounded-full font-semibold tracking-wide"
                  >
                   {loading? <span className="vip-spinner"></span>:<> Register</>}

                  </button>




                </form>










            

            <p className="mt-6 text-center text-sm text-gray-500">
  Already have an account?{" "}
  <span
    className="text-orange-500 font-semibold cursor-pointer
               hover:text-orange-600 transition-colors hover:underline"
    onClick={() => router.push("/login")}
  >
    Sign in
  </span>
</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    );
  }
