import { Controller, Get } from '@nestjs/common';

@Controller()
export class DemoController {
  @Get()
  async findAll(): Promise<string> {
    return `
      <style>
        * { font-family: Consolas, Monaco, monospace; }
        body { max-width: 500px; margin: 20px auto; }
      </style>

      <h2>Create new user &mdash; [post]/users/registration/</h2>

      <hr/>

      <form action='/users/registration' method='post'>
        <p>
          <label>Email: <input type='email' name='email' required /></label>
        </p>
        <p>
          <label>Name: <input type='text' name='name' required minlength='3' /></label>
        </p>
        <p>
          <label>Password: <input type='password' name='password' required minlength='3' /></label>
        </p>
        <p>
          <button type='submit'>Register</button>
        </p>
      </form>
    `;
  }
}
