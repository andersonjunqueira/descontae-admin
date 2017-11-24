import React, { Component, PropTypes } from 'react';
import { Table } from 'reactstrap';

class SimpleTable extends Component {

    render() {
        const { headers, children } = this.props;
        return (
            <Table hover size="sm" className="tabela">
                <thead>
                    <tr>
                        {headers && headers.map((h, index) => {
                            return (<th key={index} className={h.classNames || ''}>{h.label || ''}</th>)
                        })}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </Table>
        );
    }
}

SimpleTable.propTypes = {
    children: PropTypes.node,
    headers: PropTypes.arrayOf(PropTypes.object)
}

SimpleTable.defaultProps = {
    headers: []
};

export default SimpleTable;
