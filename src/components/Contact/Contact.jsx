import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
function Contact() {

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        msg:"",
        access_key: "572733a3-a53d-4e29-b0e6-096704ed923d"
    })



    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await axios.post('https://api.web3forms.com/submit', formData)
            console.log(res)
            if(res?.data?.success){
                toast.success(res?.data?.message)
            }else{
                toast.error(res?.data?.message)
            }
            setFormData({
                name:"",
                email:"",
                msg:"",
                access_key:"572733a3-a53d-4e29-b0e6-096704ed923d"
            })
        } catch (error) {
            console.log(error.message)
        }

    }




  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">

      <div className="bg-white shadow-lg rounded-xl grid md:grid-cols-2 max-w-5xl w-full overflow-hidden">

        {/* LEFT SIDE - CONTACT INFO */}
        <div className="bg-[#cda454] text-white p-8 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-6">
            Get in Touch
          </h2>

          <p className="mb-8 text-white/90">
            We'd love to hear from you. Send us a message or contact us through the details below.
          </p>

          <div className="space-y-5">

            <div>
              <p className="font-semibold text-lg">📍 Address</p>
              <p className="text-white/80">Jaipur, Rajasthan, India</p>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3555.1496906653747!2d75.72864007548473!3d26.99381417659892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db2a4a73e4c45%3A0x9fc74b8ab50a47d3!2sBalaji%20vihar%20lunawat%20chamber%2C%20M2%2C%20Niwaru%2C%20Jaipur%2C%20Rajasthan%20302012!5e0!3m2!1sen!2sin!4v1773071156972!5m2!1sen!2sin" width="90%" height="45%"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>

            <div>
              <p className="font-semibold text-lg">📞 Phone</p>
              <p className="text-white/80">+91 96643 98989</p>
            </div>

            <div>
              <p className="font-semibold text-lg">✉ Email</p>
              <p className="text-white/80">support@kira.com</p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="p-8">

          <h2 className="text-2xl font-bold text-[#cda454] mb-6">
            Send Message
          </h2>

          <form onSubmit={(e)=>handleSubmit(e)}
            className="space-y-5"
          >

            <input
              type="hidden"
              name="access_key"
              value={formData.access_key}
            />

            {/* NAME */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                 value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="msg"
                rows="4"
                 value={formData.msg}
                onChange={handleChange}
                required
                placeholder="Write your message..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#cda454]"
              ></textarea>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-[#cda454] text-white font-semibold py-2 rounded-lg hover:bg-[#b89340] transition"

            >
              Send Message
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Contact;