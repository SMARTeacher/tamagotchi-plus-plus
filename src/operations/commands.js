const script = (nodes) => {
    return {
        nodes: nodes,
        nextNode: 0,
        run: function () {
            console.log(`${this.nodes} ${this.nextNode}`);
            this.nodes[this.nextNode].perform();
            this.nextNode++;
            this.nextNode %= this.nodes.length;
        },
    };
};

const newActionNode = (actionFunction) => {
    return {
        type: "action",
        perform: () => actionFunction(),
        getNext: null
    }
};

const newConditionalNode = (conditionalFunction, ifTrueNode, ifFalseNode) => {
    return {
        type: "if",
        perform: () => {
            if (conditionalFunction()) {
                this.getNext = () => ifTrueNode;
            }
            else {
                this.getNext = () => ifFalseNode;
            }
        },
        getNext: null,
    }
}

const newNoOpCommand = newActionNode(() => {});

export {
    script,
    newActionNode,
    newConditionalNode,
    newNoOpCommand,
};