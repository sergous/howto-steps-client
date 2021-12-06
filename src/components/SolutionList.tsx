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

    componentDidMount() {
        this.solutionStore.search();
    }

    render() {
        return (
            <Layout>
                <Search
                    size="large"
                    placeholder="Ask how-to question"
                    onSearch={query => this.solutionStore.search(query)}
                    enterButton
                />
                {this.solutionStore.solutionsList.length ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={this.solutionStore.solutionsList}
                        renderItem={(solution: SolutionModel) => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        solution.attributes.question!.attributes
                                            .query
                                    }
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    'Solution list is empty'
                )}
                <Button
                    // disabled={!this.solutionStore.solutionQuery}
                    onClick={() => this.solutionStore.createFromQuery()}
                >
                    Publish Question
                </Button>
            </Layout>
        );
    }
}

export default inject(STORE_ROOT)(observer(SolutionList));
