import Row  from 'react-bootstrap/Row'
import { TxItem } from './TxItem'

export const TransactionList = ({ transactions }) => {
    return (
        <>
            {transactions.map( (transaction, n) => <Row key={n}> 
                <TxItem txItem={transaction}></TxItem>
            </Row>)}
        </>
    )
}