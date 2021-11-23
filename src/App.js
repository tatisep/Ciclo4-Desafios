import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './views/Home/';
import { ListarCliente } from './views/Cliente/ListarCliente/';
import { ListarServico } from './views/Servico/ListarServico/';
import { Menu } from './components/Menu';
import { ServicoItens } from './views/Servico/Item';
import { CadastrarServico } from './views/Servico/Cadastrar';
import { CadastrarCliente } from './views/Cliente/CadastrarCliente';
import { PedidosCliente } from './views/Cliente/PedidosCliente';
import { EditarPedido } from './views/Pedido/EditarPedido';
import { EditarCliente } from './views/Cliente/EditarCliente';
import { EditarCompra } from './views/Compra/EditarCompra';
import { EditarServico } from './views/Servico/EditarServico';
import { CadastrarPedido } from './views/Pedido/CadastrarPedido';
import { ListarPedido } from './views/Pedido/ListarPedido';
import { PedidoItens } from './views/Pedido/ItemPedido';
import { CadastrarCompra } from './views/Compra/CadastrarCompra';
import { ListarCompras } from './views/Compra/ListarCompra';
import { CompraItens } from './views/Compra/ItemCompra';
import { CadastrarProduto } from './views/Produto/CadastrarProduto';
import { ListarProdutos } from './views/Produto/ListarProdutos';
import { EditarProduto } from './views/Produto/EditarProduto';
import { ProdutoItens } from './views/Produto/ItemProduto';
import { ListarPedidosItens } from './views/PedidosItens/ListarItem';
import { CadastrarItemPedido } from './views/PedidosItens/CadastrarItem';
import { EditarItemPedido } from './views/PedidosItens/EditarItem';
import { ListarComprasItens } from './views/ComprasItens/ListarItem';
import { EditarItemCompra } from './views/ComprasItens/EditarItem';
import { CadastrarItemCompra } from './views/ComprasItens/CadastrarItem';
import { Sobre } from './views/Sobre';

// import{ Home } from './views/Home'

function App() {
  return (
    <div>
      <Router>
        <Menu/>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path = "/listar-clientes" component={ListarCliente}/>
          <Route path = "/listar-servicos" component={ListarServico}/>
          <Route path = "/servico-itens/:id" component={ServicoItens}/>
          <Route path = "/cadastrar-servico" component={CadastrarServico}/>
          <Route path = "/cadastrar-cliente" component={CadastrarCliente}/>
          <Route path = "/pedidos-clientes/:id/" component={PedidosCliente}/>
          <Route path = "/editar-pedido/:id/" component={EditarPedido}/>
          <Route path = "/editar-cliente/:id/" component={EditarCliente}/>
          <Route path = "/editar-compra/:id/" component={EditarCompra}/>
          <Route path = "/editar-servico/:id/" component={EditarServico}/>
          <Route path = "/cadastrar-pedido/" component={CadastrarPedido}/>
          <Route path = "/listar-pedidos/" component={ListarPedido}/>
          <Route path = "/pedido-itens/:id" component={PedidoItens}/>
          <Route path = "/cadastrar-compra" component={CadastrarCompra}/>
          <Route path = "/listar-compras" component={ListarCompras}/>
          <Route path = "/compra-itens/:id" component={CompraItens}/>
          <Route path = "/cadastrar-produto" component={CadastrarProduto}/>
          <Route path = "/produto-itens/:id" component={ProdutoItens}/>
          <Route path = "/editar-produto/:id" component={EditarProduto}/>
          <Route path = "/listar-produtos" component={ListarProdutos}/>
          <Route path = "/listar-pedidos-itens" component={ListarPedidosItens}/>
          <Route path = "/editar-item/:ServicoId/:PedidoId" component={EditarItemPedido}/>
          <Route path = "/cadastrar-item-pedido" component={CadastrarItemPedido}/>
          <Route path = "/listar-compras-itens" component={ListarComprasItens}/>
          <Route path = "/editar-item-compra/:CompraId/:ProdutoId" component={EditarItemCompra}/>
          <Route path = "/cadastrar-item-compra" component={CadastrarItemCompra}/>
          <Route path = "/sobre" component={Sobre}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
