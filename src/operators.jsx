export const operators = {
    "common": {
        "required": ["Task ID"],
        "properties": {
            "Task ID": {"type": "string"}
        }
    },
    "Bash Operator": {
        "required": ["Bash Command"],
        "properties": {
            "Bash Command": {"type": "string"}
        }
    },
    "Empty Operator": {
        "required": [],
        "properties": {}
    }
}