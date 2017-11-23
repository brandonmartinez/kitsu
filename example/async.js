import Kitsu from '../src'

const api = new Kitsu()

/**
 * Fetches the top 5 most popular anime and displays their canonical
 * titles in a list
 *
 * Displays:
 *
 * Top 5 popular anime:
 * - Fullmetal Alchemist: Brotherhood
 * - Attack on Titan
 * - Steins;Gate
 * - Sword Art Online
 * - Death Note
 */
const print = async () => {
  try {
    const { data } = await api.get('users/42603/waifu')
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

print()
