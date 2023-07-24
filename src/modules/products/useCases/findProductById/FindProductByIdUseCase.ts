import { ProductMap } from "@modules/products/mapper/ProductMap";
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
          id: feedback.id,
          user_name: feedback.user_name,
          feedback: feedback.feedback,
          feedbackWithStars: feedback.feedbackWithStars,
          created_at: feedback.created_at
        };
        return onlyMainInformationsByFeedback;
      })
    );

    const product = await this.productRepository.findById(product_id);
    const productResponse = ProductMap.toDTO(product)

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

    const averageRating = sum / onlyFeedbackWithStar.length;

    const formatNumberWithOnly1Decimal = averageRating.toFixed(1);

    const returnResult = {
      product: productResponse,
      feedbacksByProduct: onlyMainInformationsByFeedback,
      averageRating: formatNumberWithOnly1Decimal,
    };

    return returnResult;
  }
}

export { FindProductByIdUseCase };
