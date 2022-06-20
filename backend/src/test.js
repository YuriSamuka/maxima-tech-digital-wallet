(async () => {
    const um = require("./app/Models/UsuarioModel")

    // let user4 = new um('user4')
    // console.log(user4)
    // user4.senha = 123
    // user4.nome = 'cuzão2 o retorno'
    // user4.store()

    // let user5 = new um('user5')
    // console.log(user5)
    // user5.senha = 123
    // user5.nome = 'cuzão3 o retorno'
    // user5.store()

    // user5.transfer(user5, 105)

    const user2 = new um('userTeste')
    user2.store()
    console.log(user2)
    await user2.updateSaldo()
    console.log(user2)
})()