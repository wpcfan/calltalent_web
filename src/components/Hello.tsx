import * as React from 'react';

export interface HelloProps { compiler: string; framework: string; }

export class Hello extends React.Component<HelloProps, {}> {
    render() {
        return (<div>Hello</div>);
    }
}