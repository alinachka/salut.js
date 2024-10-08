export const model = {
  "intents": {
    "/sum": {
      "matchers": [
        {
          "type": "phrase",
          "rule": "Сложи @duckling.number и @duckling.number"
        },
        {
          "type": "phrase",
          "rule": "Сколько будет @duckling.number и @duckling.number"
        }
      ],
      "variables": {
        "num1": {
          "required": true,
          "questions": [
            "Что с чем?",
            "Мне нужно больше чисел!"
          ],
          "entity": "duckling.number"
        },
        "num2": {
          "required": true,
          "questions": [
            "А какое второе число?"
          ],
          "entity": "duckling.number"
        }
      }
    }
  },
  "entities": {}
}
