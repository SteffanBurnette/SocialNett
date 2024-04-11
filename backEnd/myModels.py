# Install transformers from source - only needed for versions <= v4.34
# pip install git+https://github.com/huggingface/transformers.git
# pip install accelerate

import torch
from transformers import pipeline

def advisor(prompt):
    pipe = pipeline("text-generation", model="TinyLlama/TinyLlama-1.1B-Chat-v1.0", torch_dtype=torch.bfloat16, device_map="auto")
    """Generates a response to the given prompt using Hugging Face's text-generation capabilities."""
    messages = [
    {
        "role": "system",
        "content": "You are a friendly chatbot who always responds in a slightly professional manner.",
    },
    {"role": "user", "content": prompt},]
    messagess =  {"role": "user", "content":"You are a friendly chatbot who always responds in a slightly professional manner: "+ prompt}
    #Tokenizes the message so that the model can understand it  and generate an appropriate response.
    prompt2 = pipe.tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    outputs = pipe(prompt2, max_new_tokens=256, do_sample=True, temperature=0.7, top_k=50, top_p=0.95)
    print(outputs[0]["generated_text"])
    generated_text = outputs[0]["generated_text"]
    # Split the text and extract the portion after the last '</s>'
    #response = generated_text.rsplit('</s>', 1)[-1].strip()
    # Split the text and extract the system's answer
    #response_parts = generated_text.split('</s>')
    #system_answer = response_parts[2].strip() if len(response_parts) > 2 else ""

     # Split the text and extract the portion after the last '</s>'
    response_parts = generated_text.rsplit('</s>', 1)
    if len(response_parts) > 1:
        system_answer = response_parts[-1].strip()
    else:
        system_answer = generated_text.strip()  # Fallback in case there is no '</s>' tag

    return system_answer
