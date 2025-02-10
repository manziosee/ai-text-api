import fs from 'fs/promises';
import path from 'path';

interface TrainingExample {
  prompt: string;
  completion: string;
}

export const loadTrainingData = async (): Promise<TrainingExample[]> => {
  try {
    const filePath = path.join(__dirname, '../../training_data.jsonl');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    
    return fileContent
      .split('\n')
      .filter(line => line.trim())
      .map(line => JSON.parse(line));
  } catch (error) {
    console.error('Error loading training data:', error);
    return [];
  }
};