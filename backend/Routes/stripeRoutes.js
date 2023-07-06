import express from 'express';
import stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
//Change later to env
const stripeAPI = new stripe(
  'sk_test_51NBUB0SH4AJANTU5jWfqmOGx7CITuyLxGWCtOwSxY9YO35iJLcaY0FOzMSgPhoBwpufWR6ztxCV1NrsnkM20QSGh00cswwpQa0'
);

router.get('/', (req, res, next) => {
  console.log('Get response from researcher');
  res.json({
    message: 'It works',
  });
});

router.post('/pay', (req, res) => {
  console.log('showing req.body.token', req.body);
  const { token, amount } = req.body;
  const idempontencyKey = uuidv4();
  return stripeAPI.customers
    .create({
      email: token.email,
      source: token.source,
    })
    .then((customer) => {
      return stripeAPI.paymentIntents.create(
        {
          amount: amount * 100,
          currency: 'usd',
          customer: customer.id,
          receipt_email: token.email,
        },
        {
          idempotencyKey: idempontencyKey,
        }
      );
    })
    .then((result) => {
      console.log('In result block ', result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'An error occurred during payment processing.' });
    });
});

export default router;
