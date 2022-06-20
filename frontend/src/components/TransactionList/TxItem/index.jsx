import  Col  from 'react-bootstrap/Col'

export const TxItem = ({ txItem }) => {
    return(
        <>
            <Col md={2}>
                {txItem.type}
            </Col>
            <Col md={7}>
                {txItem.user}
            </Col>
            <Col>
                {txItem.value}
            </Col>
        </>
    )
}