import React, { Component, PropTypes } from 'react';
import { Table } from 'reactstrap';

class SimpleTable extends Component {

    constructor(props) {
        super(props);
        this.createHeader = this.createHeader.bind(this);
    }

    createHeader(h, index) {
        let label = h.label || '';
        if(h.orderField && this.props.setOrderBy) {
            
            let sortDef = { property: h.orderField, direction: 'ASC' };
            if(this.props.dataSort) {
                for(let i = 0; i < this.props.dataSort.length; i++) {
                    const ds = this.props.dataSort[i];
                    if(ds.property === h.orderField) {
                        sortDef.direction = ds.direction === 'ASC' ? 'DESC' : 'ASC';
                    }
                }
            }

            label = (
                <a href="#" onClick={() => this.props.setOrderBy(sortDef.property, sortDef.direction)}>
                    {label} <i className={`fa fa-caret-${sortDef.direction === "ASC" ? "up" : 'down'}`}></i>
                </a>
            );
        }
        return (<th key={index} className={h.classNames || ''}>{label}</th>);
    }

    render() {
        const { headers, children } = this.props;
        return (
            <Table hover size="sm" className="tabela">
                <thead>
                    <tr>{headers && headers.map( (h, index) => this.createHeader(h, index) )}</tr>
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
    dataSort: PropTypes.any,
    setOrderBy: PropTypes.func
}

SimpleTable.defaultProps = {
    headers: []
};

export default SimpleTable;
