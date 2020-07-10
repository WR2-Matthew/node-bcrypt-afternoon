module.exports = {
  dragonTreasure: async (req, res) => {
    const db = req.app.get('db')

    const dragTres = await db.get_dragon_treasure(1)
    return res.status(200).send(dragTres)
  },

  getUserTreasure: async (req, res) => {
    const db = req.app.get('db')

    const userTres = await db.get_user_treasure(req.session.user.id)
    return res.status(200).send(userTres)
  },

  addUserTreasure: async (req, res) => {
    const db = req.app.get('db')
    const { treasureURL } = req.body
    const { id } = req.session.user

    const userTreasure = await db.add_user_treasure(treasureURL, id)
    return res.status(200).send(userTreasure)
  }
}