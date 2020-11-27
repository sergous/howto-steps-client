import { ItemModel, TagType } from '.';
import { observable } from 'mobx';
import { TagStore } from '../stores';
import { TagModelError } from '../errors';

export class TagModel extends ItemModel {
    @observable private type_: TagType;
    static TYPE = TagType;

    ERROR = TagModelError;

    constructor(type: TagType, store?: TagStore) {
        super(store);
        this.type_ = type;
    }

    set type(type: TagType) {
        this.type_ = type;
    }

    get type(): TagType {
        return this.type_;
    }
}
