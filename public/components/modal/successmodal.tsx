'use client'
import { Lora, Raleway } from "../../fonts"
// import { AiOutlineCopyrightCircle } from 'react-icons/ai'
import { useRouter } from "next/navigation"
import { ReactNode } from "react"

type props = {
    width?: string
    children: ReactNode
}
export const SuccessModal = ({children, width= '35%'}:props) => {
    const router = useRouter()
    return (
        <div className="bg-hero-pattern bg-white bg-fixed bg-cover bg-center w-full h-[100vh] fixed top-0 left-0 z-[1000]">
            <div className="bg-container border-[1px] h-[95px] flex items-center pl-12">
                <img src='/assets/MPM logo.png' alt='' className='lg:w-[120px] lg:h-[120px] w-[90px] h-[90px] object-contain' />
            </div>
            <div className="relative bg-white mx-auto flex shadow-sm flex-col justify-start rounded-[12px] py-4 items-center h-auto my-[5%]" style={{width: width}}>
              {children}
            </div>
            <span className={`${Lora.className} font-light flex justify-center items-center text-[#B9B4B4] text-[14px] pb-2`}>
                {/* <AiOutlineCopyrightCircle /> */}
                <p>2023 SuperSoft Technology , All Right Reserved | Legal | Privacy | Contact US</p>
            </span>
        </div>
    )
}