import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Patch, 
    Param, 
    Delete, 
    NotFoundException, 
    ParseIntPipe 
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@Controller('articles')
export class ArticlesController {
    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @ApiCreatedResponse({ type: ArticleEntity })
    create(@Body() createArticleDto: CreateArticleDto) {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    findAll() {
        return this.articlesService.findAll();
    }

    @Get('drafts')
    @ApiOkResponse({ type: ArticleEntity, isArray: true })
    findDrafts() {
      return this.articlesService.findDrafts();
    }

    @Get(':id')
    @ApiOkResponse({ type: ArticleEntity })
    indOne(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.findOne(id);
    }

    @Patch(':id')
    @ApiOkResponse({ type: ArticleEntity })
    update(@Param('id', ParseIntPipe) id: number, @Body() updateArticleDto: UpdateArticleDto) {
        return this.articlesService.update(id, updateArticleDto);
    }
    @Delete(':id')
    @ApiOkResponse({ type: ArticleEntity })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.articlesService.remove(id);
    }
}
