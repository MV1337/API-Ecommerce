import { IFeedbackRepository } from "@modules/products/repositories/IFeedbackRepository";
import { IProductRepository } from "@modules/products/repositories/IProductRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class FindProductByIdUseCase {
  constructor(
    @inject("FeedbackRepository")
    private feedbackRepository: IFeedbackRepository,
    @inject("ProductRepository")
    private productRepository: IProductRepository
  ) {}

  async execute(product_id: string) {
    const feedbacksByProduct = await this.feedbackRepository.findByProductId(
      product_id
    );

    const onlyMainInformationsByFeedback = await Promise.all(
      feedbacksByProduct.map((feedback) => {
        const onlyMainInformationsByFeedback = {
          user_name: feedback.user_name,
          feedback: feedback.feedback,
          feedbackWithStars: feedback.feedbackWithStars,
        };
        return onlyMainInformationsByFeedback;
      })
    );

    const product = await this.productRepository.findById(product_id);

    const onlyFeedbackWithStar = feedbacksByProduct.map((feedback) => {
      const returnOnlyFeedbackWithstar = feedback.feedbackWithStars.toString();

      return returnOnlyFeedbackWithstar;
    });

    const convertArrayInNumBer = onlyFeedbackWithStar.map((feedback) => {
      const feedbackWithStarNumber = parseInt(feedback);

      return feedbackWithStarNumber;
    });

    let sum = 0;

    for (var i = 0; i < convertArrayInNumBer.length; i++) {
      sum += convertArrayInNumBer[i];
    }

    const avarageRating = sum / onlyFeedbackWithStar.length;

    const formatNumberWithOnly2Decimals = avarageRating.toFixed(1);

    const returnResult = {
      product,
      feedbacksByProduct: onlyMainInformationsByFeedback,
      avarageRating: formatNumberWithOnly2Decimals,
    };

    return returnResult;
  }
}

export { FindProductByIdUseCase };
