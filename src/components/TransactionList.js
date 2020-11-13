import React from 'react';

const TransactionList = ({ items, onModifyItem, onDeleteItem }) => {
    return (
        <ul className = "list-group list-group-flush">
            {
                items.map((item) => (
                    <li className = "list-group-item d-flex justify-content-between align-items-center"
                        key = {item.id}
                    >
                        <span className="col-1 badge badge-primary">
                            {item.category.name}
                        </span>
                        <span className="col-5">{item.desc}</span>
                        <span className="col-2 font-weight-bold">
                            {(item.category.type === 'income') ? '+' : '-'}
                            ${item.amount}
                        </span>
                        <span className="col-2">{item.date}</span>
                        <button 
                            className="col-1 btn btn-primary"
                            onClick={() => {
                                onModifyItem(item);
                            }}
                        >edit</button>
                        <button 
                            className="col-1 btn btn-danger"
                            onClick={() => {
                                onDeleteItem(item);
                            }}
                        >delete</button>
                    </li>
                ))
            }
        </ul>
    );
}

export default TransactionList;