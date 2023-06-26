import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <section aria-label="Site Footer" className=" bg-gray-900 text-white flex flex-col md:flex-row py-3 justify-center items-center">
          <p className="text-xs text-gray-300 pb-2">
            Được xây dựng dựng bởi tao, và tao làm nó chỉ trong giờ nghỉ trưa, sử dụng không được thì cút!
          </p>
      </section>

    </footer>
  )
}

export default Footer