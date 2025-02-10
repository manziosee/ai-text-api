var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import fs from 'fs/promises';
import path from 'path';
export const loadTrainingData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path.join(__dirname, '../../training_data.jsonl');
        const fileContent = yield fs.readFile(filePath, 'utf-8');
        return fileContent
            .split('\n')
            .filter(line => line.trim())
            .map(line => JSON.parse(line));
    }
    catch (error) {
        console.error('Error loading training data:', error);
        return [];
    }
});
