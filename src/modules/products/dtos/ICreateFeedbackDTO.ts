class ICreateFeedbackDTO {
    order_id: string
    product_id: string
    product_title: string
    feedback: string
    feedbackWithStars: number
    user_name: string
}

export {ICreateFeedbackDTO}