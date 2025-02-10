import { Router } from 'express';
import { getRecruitmentResponse } from '../controllers/recruitmentController';

export const router = Router();

router.post('/recruit', getRecruitmentResponse);