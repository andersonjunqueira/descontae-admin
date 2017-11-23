import React, { Component, PropTypes } from 'react';

class Table extends Component {

    render() {
        const { headers, children } = this.props;
        return (
            <Table hover size="sm" className="tabela">
                <thead>
                    <tr>
                        {headers && headers.map((h, index) => {
                            return (<th key={index} className={h.classNames || ''}>{h.label || <span/>}</th>)
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

Table.propTypes = {
    children: PropTypes.node,
    headers: PropTypes.arrayOf(PropTypes.object)
}

Table.defaultProps = {
    headers: []
};

export default Table;
