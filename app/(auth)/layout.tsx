const Layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  )
}

/**
 * flex-center: Esta classe não é uma classe padrão do Tailwind CSS. Pode ser uma classe customizada definida em algum lugar do seu projeto. Geralmente, poderia ser usada para centralizar conteúdo usando flexbox, como justify-center e items-center.
 * min-h-screen: Define a altura mínima do elemento como a altura total da tela.
 * w-full: Define a largura do elemento para ocupar 100% da largura disponível.
 * bg-primary-50: Define a cor de fundo do elemento usando uma cor específica chamada primary-50. Esta classe também não é padrão do Tailwind CSS e provavelmente é uma cor personalizada definida nas configurações do Tailwind.
 * bg-dotted-pattern: Aplica uma imagem de fundo ou padrão de pontos. Esta também não é uma classe padrão do Tailwind CSS, indicando que provavelmente é uma classe personalizada que define um padrão de pontos como fundo.
 * bg-cover: Faz com que a imagem de fundo cubra toda a área do elemento, ajustando o tamanho da imagem para garantir que ela cubra o elemento completamente, sem deixar espaços vazios.
 * bg-fixed: Fixa a imagem de fundo de modo que ela não se mova quando o usuário rola a página.
 * bg-center: Centraliza a imagem de fundo dentro do elemento.
 * 
 */

export default Layout