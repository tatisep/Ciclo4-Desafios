import { Container } from "reactstrap";

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="m-auto p-2">
                        <h1>Página Inicial</h1>
                    </div>
                    <div className="p-2">
                        <a href="/listar-clientes" className="btn btn-outline-success btn-sm">Cliente</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedidos" className="btn btn-outline-success btn-sm">Pedido</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-servicos" className="btn btn-outline-success btn-sm">Serviço</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compras" className="btn btn-outline-success btn-sm">Compra</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-pedidos-itens" className="btn btn-outline-success btn-sm">Item Pedido</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-compras-itens" className="btn btn-outline-success btn-sm">Item Compra</a>
                    </div>
                    <div className="p-2">
                        <a href="/listar-produtos" className="btn btn-outline-success btn-sm">Produto</a>
                    </div>
                </div>
            </Container >
        </div >
    );
};