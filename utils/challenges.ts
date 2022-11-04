import path from 'path';
import fs from 'fs';

export interface IChallenge {
  title : string;
  level : string;
  desc : string;
  challenge : string;
}

const root = process.cwd();
const CHALLENGES_PATH = path.join(root, './challenges');
const REG =
  /^\/\*\*\*\*\*\*\*challenges-description\*\*\*\*\*(.*)\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\/(.*)$/s;

const getChallengeInfo = (challengeContent, challengeFileName) : IChallenge => {
  const result = challengeContent.match(REG);
  if (!result) return null;
  const desc = result[1].replace(/^\s+|\s+$/g, '');
  const challenge = result[2].replace(/^\s+|\s+$/g, '');
  const [level, ...title] = challengeFileName.replace('.ts', '').split('-');
  return { desc, challenge, level, title : title.join(" ") };
};

export async function getAllChallenges() {
  const files = fs.readdirSync(CHALLENGES_PATH);
  const challenges = files.reduce<IChallenge[]>((allChallenges, challengeFileName) => {
    const filePath = path.join(root, './challenges', challengeFileName);
    const source = fs.readFileSync(filePath, 'utf8');

    const challenge = getChallengeInfo(source, challengeFileName);
    if (!challenge) return allChallenges;
    return [challenge, ...allChallenges];
  }, []);
  return challenges;
}
