import UsersRepository from 'repositories/UsersRepository'

class AccountsService {
    createAccount = UsersRepository.create.bind(UsersRepository)
}

export default new AccountsService()
