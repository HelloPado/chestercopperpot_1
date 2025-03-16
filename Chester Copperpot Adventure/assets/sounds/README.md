# Chester Copperpot Adventure - Sound Files

This directory contains placeholder text files for the game's sound effects and music. You'll need to replace these text files with actual audio files before the game will have sound.

## Sound Effects (WAV format)

| Filename | Description | When It Plays |
|----------|-------------|---------------|
| jump.wav | A simple "boop" sound | When Chester jumps |
| coin.wav | A bright "ping" sound | When collecting coins |
| death.wav | A short descending tone | When Chester loses a life |
| levelup.wav | An ascending chime | When completing a level |
| boulder.wav | A rumbling sound | When boulders are rolling |
| key.wav | A metallic "ting" sound | When collecting a key |

## Music (MP3 format)

| Filename | Description |
|----------|-------------|
| background.mp3 | Main background music loop |

## How to Replace Placeholder Files

1. Create or obtain the actual audio files with the same names as the placeholders
2. Make sure they match the format (.wav for sound effects, .mp3 for music)
3. Replace the .txt placeholder files with the actual audio files
4. Test the game to ensure the sounds play at the appropriate times

## Sound Resources

If you need free sound effects or music, consider these resources:

- [Freesound](https://freesound.org/) - Community-based database of free sounds
- [OpenGameArt](https://opengameart.org/) - Free game assets including sounds
- [Incompetech](https://incompetech.com/) - Royalty-free music by Kevin MacLeod
- [Pixabay Sound Effects](https://pixabay.com/sound-effects/) - Free sound effects

## Implementation Notes

The game uses the HTML5 Audio API to play sounds. Sound loading and playing is handled in the `game.js` file. Make sure your audio files are compatible with web browsers (WAV and MP3 formats are widely supported). 