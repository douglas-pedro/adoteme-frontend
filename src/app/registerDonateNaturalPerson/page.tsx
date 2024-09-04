import Image from 'next/image'
import Input from '../components/Input'
import Button from '../components/Button'
import Logo from '../../../public/img/logo.png'

export default function registerDonateNaturalPerson() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen">
      <Image alt="logo" src={Logo} />
      <div className="mt-4 w-full max-w-md">
        <div className="max-h-[80vh] overflow-y-auto w-full">
          <Input
            placeholder="Nome Completo"
            type="text"
            className="bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="CEP"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Logradouro"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Número"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Complemento"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Bairro"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Cidade"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Estado"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Telefone"
            type="text"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="E-mail"
            type="email"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Senha"
            type="password"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
          <Input
            placeholder="Confirmar Senha"
            type="password"
            className="mt-2 bg-purple-500 font-bold w-full"
          />
        </div>
      </div>
      <div className="mt-4 w-full max-w-md">
        <Button
          variant="bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold rounded-lg w-full"
          title="Cadastrar"
        />
      </div>
    </main>
  )
}
