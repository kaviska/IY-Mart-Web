<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guest Ticket Booking</title>
    <script src="https://js.stripe.com/v3/"></script>
</head>

<body>
    <h1>Guest Ticket Booking</h1>
    <form id="ticketForm">
        <input type="number" name="event_id" placeholder="event" />
        <input type="text" name="first_name" placeholder="First Name" required><br>
        <input type="text" name="last_name" placeholder="Last Name" required><br>
        <input type="email" name="email" placeholder="Email" required><br>
        <input type="text" name="mobile" placeholder="Mobile Number" required><br>
        <input type="number" name="adult_quantity" placeholder="Adult Quantity" required><br>
        <input type="number" name= "child_quantity" placeholder="Child Quantity" required><br>
        {{-- <input type="number" name="amount" placeholder="Amount (per ticket)" required><br> --}}

        <div id="card-element"><!-- Stripe Card Element --></div>
        <div id="card-errors" role="alert" style="color: red;"></div><br>

        <button type="button" onclick="submitTicket()">Pay & Book Ticket</button>
    </form>

    <script>
        const stripe = Stripe(
            'pk_test_51QWWdvR4VLo3mzuuKuQQPRI5WfebOSSxfMBSM7h5HTuhUU2WAGUAC87dzKf0rqIgfU4KL8HpIWWJq9QDTsV2HXJ3003GRe0wkQ'
        ); // Replace with your Stripe public key
        const elements = stripe.elements();

        // Create an instance of the Card Element
        const cardElement = elements.create('card');
        cardElement.mount('#card-element');

        async function submitTicket() {
            const form = document.getElementById('ticketForm');
            const formData = new FormData(form);

            // Create a PaymentIntent on the server
            const paymentIntentResponse = await fetch('/buy-ticket', {
                method: 'POST',
                body: formData,
            }).then(res => res.json());

            if (!paymentIntentResponse.success) {
                alert('Error creating PaymentIntent: ' + paymentIntentResponse.message);
                return;
            }

            // console.log(paymentIntentResponse);

            const clientSecret = paymentIntentResponse.client_secret;

            // Confirm the payment on the client
            const {
                paymentIntent,
                error
            } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${formData.get('first_name')} ${formData.get('last_name')}`,
                        email: formData.get('email'),
                    },
                },
                return_url: 'https://yourwebsite.com/payment-success', // Update with your return URL
            });

            if (error) {
                
                let paymentResponse = await fetch('/payment-fail', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ticket_id: paymentIntentResponse.ticket_id,
                        validateData: paymentIntentResponse.validateData,
                        paymentIntentId: paymentIntentResponse.payment_intent_id,
                    }),
                });

                if (paymentResponse.success) {
                    document.getElementById('card-errors').textContent = error.message;
                } else {
                    alert('Payment processing: ' + paymentIntent.status);
                }
                
            } else if (paymentIntentResponse.success) {
                let paymentResponse = await fetch('/payment-success', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        ticket_id: paymentIntentResponse.ticket_id,
                        validateData: paymentIntentResponse.validateData,
                        paymentIntentId: paymentIntentResponse.payment_intent_id,
                    }),
                });

                if (paymentResponse.success) {
                    alert('Payment successful! Ticket booked.');
                } else {
                    alert('Payment processing: ' + paymentIntent.status);

                }
            } else {
                alert('Payment processing: ' + paymentIntent.status);
            }
        }
    </script>

</body>

</html>
