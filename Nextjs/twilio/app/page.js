"use client";

export default function HomePage() {
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // console.log(formData.get("message"));
    // console.log(formData.get("phone"));

    const sms = {
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/sms", {
      method: "POST",
      body: JSON.stringify(sms),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);

    alert(`Message sent`);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={onSubmit} className="bg-slate-950 p-10 rounded-md">
        <h1 className="text-white text-3xl font-bold">Send an SMS</h1>

        <label htmlFor="" className="text-white block py-4">
          Write your phone number here:
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="Write your phone number here"
          className="py-1 px-3 rounded-md block"
          autoComplete="off"
        />

        <label htmlFor="" className="text-white block py-4">
          Write your message here:
        </label>
        <textarea
          name="message"
          placeholder="Write your message here"
          className="py-1 px-3 rounded-md block w-full"
        ></textarea>

        <button className="bg-blue-500 text-white py-1 px-3 rounded-md block mt-4">
          Send
        </button>
      </form>
    </div>
  );
}
