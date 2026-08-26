export const rejections = [
  "You left this stall on read. It's fine. It has seen worse.",
  "Your thumb moved too fast to appreciate a clean porcelain opportunity.",
  "This stall will remember your hesitation. It always does.",
  "You skipped? Bold. The toilet paper is judging you from the roll.",
  "Some stalls are meant to be reserved, not swiped past like a bad date.",
  "Your left swipe said a lot. Mostly 'I was not ready for this level of hygiene.'",
  "This stall has a strong cleanliness score and you still chose the void.",
  "You passed on a stall with a mood. The mood is now disappointed.",
  "The bidet is still warm, but not for you.",
  "You skipped a stall that could have saved your day. Or at least your bladder.",
  "This stall will tell the other stalls you were not committed.",
  "Your swipe was so casual, the toilet seat is still cold in protest.",
  "You left this stall in the 'maybe' pile. It is now in the 'no' pile.",
  "The hand sanitizer is drying, and so is your chance.",
  "This stall has a reputation. You just added 'hesitant' to it.",
  "You swiped left on a stall with a view. The view is now a memory.",
  "The stall's mood was fine. Your timing was not.",
  "You passed on a clean stall. The grime is celebrating.",
  "This stall will be here tomorrow, still clean, still disappointed.",
  "Your left swipe was a statement. The statement was 'I can live with regret.'",
  "The toilet paper roll is now emotionally unavailable.",
  "You skipped a stall that had a vibe. The vibe is now a ghost.",
  "This stall's cleanliness score is a small miracle. You chose chaos.",
  "You left this stall single. It has a seat, a lock, and a chance.",
  "The stall is still spotless. Your decision is not.",
  "You swiped past a stall with a price tag. The tag is now a lesson.",
  "This stall will be featured in the local restroom gossip network.",
  "You skipped a stall with a map pin. The pin is now lonely.",
  "The stall's hygiene photo was flattering. Your swipe was not.",
  "You passed on a stall that was ready. The stall is now overthinking."
];

export const rejectionMessages = rejections;

export const getRandomRejection = () => {
  const index = Math.floor(Math.random() * rejections.length);
  return rejections[index];
};

export default rejections;