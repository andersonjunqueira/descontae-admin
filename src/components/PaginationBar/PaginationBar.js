import React, { Component, PropTypes } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Row, Col } from 'reactstrap';

class PaginationBar extends Component {

    constructor(props) {
        super(props);
        this.getPaginationLinks = this.getPaginationLinks.bind(this);
    }

    getPaginationLinks(data) {
        
        let paginationLinks = [];
        if(data.totalPages > 1) {
            if(!data.first) {
                paginationLinks.push({ icon: "fa fa-step-backward", page: 0});
            }

            let start = data.number - 4;
            let last = data.number + 5;

            if(start < 0) {
                start = 0;
            }

            if(last > data.totalPages) {
                last = data.totalPages;
            }

            for (let i=start; i < last; i++) {
                paginationLinks.push({ text: i+1, page: i, active: i === data.number});
            }

            if(!data.last) {
                paginationLinks.push({ icon: "fa fa-step-forward", page: data.totalPages-1});
            }
        }

        return paginationLinks;        
    }

    render() {
        const { data, selectPage } = this.props;
        let paginationLinks = this.getPaginationLinks(data);
        if(paginationLinks.length > 0) {
            return (
                <Row>
                    <Col xs={12} md={12}>
                        <Pagination className="pull-right">
                            {paginationLinks.map( (item, index) => {
                                return (<PaginationItem key={index} active={item.active}>
                                    <PaginationLink onClick={() => { selectPage(item.page); }}>
                                        <i className={"fa " + item.icon}></i>
                                        {item.text}
                                    </PaginationLink>
                                </PaginationItem>)
                            })}
                        </Pagination>
                    </Col>
                </Row>
            );
        } else {
            return (<div></div>);
        }
    }
}

PaginationBar.propTypes = {
    data: PropTypes.object,
    selectPage: PropTypes.func
}

export default PaginationBar;
