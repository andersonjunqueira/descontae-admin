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
                            let label = h.label || '';
                            if(h.orderField && this.props.setOrderBy) {
                                label = (<a href="#" onClick={() => this.props.setOrderBy('nome','DESC')}>{label}</a>);
                            }
                            return (<th key={index} className={h.classNames || ''}>{label}</th>);
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
    headers: PropTypes.arrayOf(PropTypes.object),
    setOrderBy: PropTypes.func
}

SimpleTable.defaultProps = {
    headers: []
};

export default SimpleTable;
