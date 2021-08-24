import UsersRepository from 'repositories/UsersRepository'

class AccountsService {
    createAccount = UsersRepository.create
}

export default new AccountsService()
