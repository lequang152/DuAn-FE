class GlobalVariable {
  private static instance: GlobalVariable;
  private questionID: any[];
  private myRef: any;
  private title: string[];
  private isPlaying: boolean;
  private totalQuestions: any[];
  private isSubmitted: boolean;
  private answers: any
  private timeLimit: number
  private timeDoTest: number
  private reviewAnswerData: any;
  private scoringType: string;
  private answersOnTest: any
  private pagesData: any[]
  private questionToCorrect: any
  private isTimeLimited: boolean

  private constructor() {
    // Initialize the instance
    this.questionID = [];
    this.myRef = {};
    this.title = []
    this.isPlaying = false
    this.totalQuestions = []
    this.isSubmitted = false;
    this.answers = {}
    this.timeLimit = 0
    this.timeDoTest = 0
    this.reviewAnswerData = {}
    this.scoringType = ''
    this.answersOnTest = {}
    this.pagesData = []
    this.questionToCorrect = {}
    this.isTimeLimited = false
  }

  public static getInstance(): GlobalVariable {
    if (!GlobalVariable.instance) {
      GlobalVariable.instance = new GlobalVariable();
    }
    return GlobalVariable.instance;
  }

  public getQuestionID(): any[] {
    return this.questionID;
  }

  public setQuestionID(newID: number): void {
    if (!this.questionID.includes(newID)) {
      this.questionID.push(newID);
    }
  }

  public removeQuestionID(): void {
    this.questionID.splice(0, this.questionID.length);
  }

  public getTotalQuestions(): any[] {
    return this.totalQuestions;
  }

  public setTotalQuestions(id: number): void {
    if (!this.totalQuestions.includes(id)) {
      this.totalQuestions.push(id);
    }
  }

  public removeTotalQuestions(): void {
    this.totalQuestions.splice(0, this.totalQuestions.length);
  }


  public getIsPlaying(): boolean {
    return this.isPlaying
  }

  public setIsPlaying(bool: boolean): void {
    this.isPlaying = bool;
  }

  public getAnswers(): any {
    return this.answers
  }

  public setAnswers(ans: any) {
    this.answers = ans
  }

  public removeAnswers() {
    this.answers = {}
  }

  public getMyRef(key: number): any {
    return this.myRef[key];
  }

  public setMyRef(key: number, value: HTMLLIElement | null) {
    this.myRef[key] = value;
  }

  public getIsSubmitted(): boolean {
    return this.isSubmitted
  }

  public setIsSubmitted(bool: boolean): void {
    this.isSubmitted = bool
  }

  public getTimeLimit(): number {
    return this.timeLimit
  }

  public setTimeLimit(timeLimit: number): void {
    this.timeLimit = timeLimit
  }

  public getTimeDoTest(): number {
    return this.timeDoTest
  }

  public setTimeDoTest(num: number): void {
    this.timeDoTest = num
  }

  public removeTimeDoTest() {
    this.timeDoTest = 0
  }

  public getReviewAnswerData(): any{
    return this.reviewAnswerData
  }

  public setReviewAnswerData(obj: any): void {
    this.reviewAnswerData = obj
  }

  public getScoringType(): string {
    return this.scoringType
  }

  public setScoringType(type: string): void {
    this.scoringType = type 
  }

  public getAnswersOnTest() {
    return this.answersOnTest
  }

  public setAnswerOnTest(key: number, value: string) {
    this.answersOnTest[key] = value
  }

  public removeAnswerOnTest() {
    this.answersOnTest = {}
  }

  public getPagesData() {
    return this.pagesData
  }

  public setPagesData(obj: any[]) {
    this.pagesData = obj
  }

  public removePageData() {
    this.pagesData = []
  }

  public getQuestionToCorrect() {
    return this.questionToCorrect
  }

  public setQuestionToCorrect(questionId: number, idAnswer: number, value: string) {
    if (!(questionId in this.questionToCorrect)) {
      this.questionToCorrect[questionId] = {};
    }
      this.questionToCorrect[questionId][idAnswer] = value;
  }

  public getIsTimeLimited() {
    return this.isTimeLimited
  }

  public setIsTimeLimited(bool: boolean) {
    this.isTimeLimited = bool
  }
 }

export default GlobalVariable;