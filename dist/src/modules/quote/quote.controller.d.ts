import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { Quote } from './quote.entity';
export declare class QuoteController {
    private readonly quoteService;
    constructor(quoteService: QuoteService);
    checkQuote(dto: CreateQuoteDto): Promise<Quote>;
    findById(id: string): Promise<Quote>;
    findByDiagnosisId(diagnosisId: string): Promise<Quote[]>;
}
