import React from 'react'

const RefundPolicy = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8 text-yellow-500">
        <h1 className="text-3xl font-semibold mb-2">Refund & Cancellation Policy</h1>
        <p className="text-sm text-yellow-500 mb-6">Last updated on Jul 17th, 2025</p>

        <p className="mb-4 text-gray-100">
            For the purpose of this Refund & Cancellation Policy, the terms <strong>"we"</strong>, <strong>"us"</strong>, and <strong>"our"</strong> refer to <strong>Kalaga Prasad Astrology</strong>, whose registered/operational office is <em>Devi Durga Nagar, opposite bus stand, Tanuku, West Godavari, Andhra Pradesh 534211</em>. The terms <strong>"you"</strong>, <strong>"your"</strong>, or <strong>"client"</strong> refer to any natural or legal person availing our services.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">No Refund on Completed Services</h2>
        <p className="mb-4 text-gray-100">
            Once a consultation has been provided (in-person, online, or telephonic), no refund will be issued as payment is for the time, expertise, and effort spent in analysis and guidance.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Cancellation Before Service</h2>
        <ul className="list-disc list-inside mb-4 space-y-2 text-gray-100">
            <li>If a client cancels at least 24 hours before the scheduled appointment, 80% of the consultation fee will be refunded (20% retained as administrative and scheduling charges).</li>
            <li>If a cancellation request is received less than 24 hours before the appointment, no refund will be issued.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">Rescheduling</h2>
        <p className="mb-4 text-gray-100">
            Clients may reschedule their appointment once without any extra charge, provided the request is made at least 12 hours before the original appointment time.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Missed Appointments</h2>
        <p className="mb-4 text-gray-100">
            If a client fails to attend the appointment at the scheduled time without prior notice, the session will be considered completed, and no refund will be provided.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Incorrect Information</h2>
        <p className="mb-4 text-gray-100">
            No refund will be given if the predictions or guidance are affected due to incorrect birth details or incomplete information provided by the client.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Force Majeure</h2>
        <p className="mb-4 text-gray-100">
            If a consultation is canceled due to unforeseen circumstances on our side (health emergency, technical issue, etc.), clients will be offered the choice of a full refund or a rescheduled appointment.
        </p>
        </section>

  )
}

export default RefundPolicy