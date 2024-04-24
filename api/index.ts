import { Router } from 'express';

export default function setupApi() {
  const router = Router();

  router.post('/api/users/:user_id/actions/resendEmail', (request, response) => {
    return response.status(200).json({ response: 'A new email has been sent'} );
  })

  router.post('/api/users/getTotalOrder?', (request, response) => {
    const userIds = (request.query.userIds as string).split(',');

    return response.status(200).json({ values: userIds.map(u => Math.round(Math.random() * 100)) });
  })

  return router;
}