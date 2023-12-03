import { connectToDataBase } from "../../../libs/db";

async function handler(req: any, res: any) {
  if (req.method == "GET") {
    const client = await connectToDataBase();

    const db = client.db();
    const collection = db.collection("RiskprofileQuestionsAnswers");
    const data: any = await collection.find({}).sort({ questionID: 1 }).toArray();

    let answersArray = [];
    for (let i = 0; i < data.length; i++) {
      answersArray.push({
        answer: data[i].answer,
        answerID: data[i].answerID,
        questionID: data[i].questionID,
        score: data[i].score,
        question: data[i].question,
        isSelected: data[i].isSelected,
      });
    }

    let questionsArray: any = [];
    let uniqueQuestionsArray: any = [];

    for (let i = 0; i < data.length; i++) {
      questionsArray.push(data[i].question);
    }

    questionsArray.forEach((element: any) => {
      if (!uniqueQuestionsArray.includes(element)) {
        uniqueQuestionsArray.push(element);
      }
    });

    res.status(200).json({
      questions: uniqueQuestionsArray,
      answers: answersArray,
    });
    client.close();
  }
}

export default handler;
