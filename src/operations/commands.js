const processScript = (firstNode) => {
    let node = firstNode;
    while (node) {
        node.perform();
        // TODO: Add a pause
        if (node.getNext()) {
            node = node.getNext();
        }
    }
}

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
    processScript,
    newActionNode,
    newConditionalNode,
    newNoOpCommand,
};