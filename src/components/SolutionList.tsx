import React, { Component } from 'react';
import { Layout, List, Button } from 'antd';
import { STORE_ROOT } from '../constants/stores';
import { inject, observer } from 'mobx-react';
import { RootStore } from '../stores';
import { SolutionModel } from '../models';
import Search from 'antd/lib/input/Search';

export interface RootStoreProps {
    rootStore?: RootStore;
}

class SolutionList extends Component<RootStoreProps> {
    private readonly solutionStore = this.props.rootStore!.solutionStore;

    async onSearch() {
        // this.solutionStore.solutions = ([
        //     { id: '1' },
        // ] as unknown) as SolutionModel[];
        this.solutionStore.items = await this.solutionStore.api.findAll();
    }

    renderList() {
        return this.solutionStore.items.map((s: any) => (
            <li key={s.id}>{s.id}</li>
        ));
    }

    list() {
        return this.solutionStore.solutions;
        // return [{ id: '1' }];
    }

    create() {
        this.solutionStore.solutionQuery = Date.now.toString();
        this.solutionStore.createFromQuery();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.create()}>Create</button>

                <button onClick={() => this.onSearch()}>Search</button>
                <ul>{this.renderList()}</ul>
            </div>
            // <Layout>
            //     <Search
            //         size="large"
            //         placeholder="Ask how-to question"
            //         onSearch={() => this.onSearch()}
            //         enterButton
            //     />
            //     <ul>{this.renderList()}</ul>
            //     <List
            //         itemLayout="horizontal"
            //         dataSource={this.list()}
            //         renderItem={(solution: SolutionModel) => (
            //             <List.Item>
            //                 <List.Item.Meta title={solution.id} />
            //             </List.Item>
            //         )}
            //     />
            //     <Button
            //         // disabled={!this.solutionStore.solutionQuery}
            //         onClick={() => this.solutionStore.createFromQuery()}
            //     >
            //         Publish Question
            //     </Button>
            // </Layout>
        );
    }
}

export default inject(STORE_ROOT)(observer(SolutionList));
